"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EventCard } from "@/components/event-card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EventForm } from "@/components/forms/event-form";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: events, isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: () => fetch("/api/events").then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-[250px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Event Overview</h1>
          <p className="text-slate-500 mt-1">Monitor registrations and manage upcoming events.</p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="rounded-full px-6 shadow-lg hover:shadow-xl transition-all">
              <Plus className="mr-2 h-5 w-5" /> Create New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Event</DialogTitle>
            </DialogHeader>
            <EventForm onSuccess={() => setIsModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {!events || events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed rounded-3xl">
          <div className="bg-slate-50 p-4 rounded-full mb-4">
            <Calendar className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No events created</h3>
          <p className="text-slate-500 mb-6">Get started by creating your first event dashboard.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event: any) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}