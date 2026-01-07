"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users, UserPlus } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RegistrationForm } from "./forms/registration-form";
import { ViewAttendees } from "./view-attendees";

export function EventCard({ event }: { event: any }) {
  const [open, setOpen] = useState(false);
  const isFull = event.attendees.length >= event.capacity;

  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-md border-border/60">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-xl font-bold leading-tight">{event.title}</CardTitle>
          <Badge variant={isFull ? "destructive" : "outline"} className="shrink-0">
            {isFull ? "Full" : `${event.capacity - event.attendees.length} left`}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-6 line-clamp-2 italic">
          {event.description || "No description provided."}
        </p>
        <div className="space-y-3">
          <div className="flex items-center text-sm font-medium">
            <CalendarDays className="mr-2 h-4 w-4 text-primary" />
            {format(new Date(event.date), "PPP p")}
          </div>
          <div className="flex items-center text-sm font-medium">
            <Users className="mr-2 h-4 w-4 text-primary" />
            {event.attendees.length} / {event.capacity} Attendees
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 grid grid-cols-2 gap-2">
        <ViewAttendees event={event} />
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" variant="default" disabled={isFull}>
              <UserPlus className="mr-2 h-4 w-4" /> Register
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register for {event.title}</DialogTitle>
            </DialogHeader>
            <RegistrationForm eventId={event.id} onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}