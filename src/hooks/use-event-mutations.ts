import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateAttendee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/attendees", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to register");
      return res.json();
    },
    onMutate: async (newAttendee) => {
      await queryClient.cancelQueries({ queryKey: ["events"] });
      const previousEvents = queryClient.getQueryData(["events"]);
      

      return { previousEvents };
    },
    onError: (err, newAttendee, context) => {
      queryClient.setQueryData(["events"], context?.previousEvents);
      toast.error("Registration failed. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Attendee registered successfully!");
    },
  });
}