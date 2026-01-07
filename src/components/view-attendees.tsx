import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Users, Mail, User, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ViewAttendees({ event }: { event: any }) {
  const attendeeCount = event.attendees?.length || 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="w-full justify-start font-normal text-muted-foreground hover:text-primary">
          <Users className="mr-2 h-4 w-4" />
          <span>{attendeeCount} Registered</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-bold">Attendees</SheetTitle>
            <Badge variant="secondary" className="rounded-full">
              {attendeeCount} / {event.capacity}
            </Badge>
          </div>
          <SheetDescription className="text-base">
            Guest list for <span className="font-medium text-foreground">{event.title}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8">
          {attendeeCount === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl bg-muted/30">
              <div className="bg-background p-3 rounded-full shadow-sm mb-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">No registrations yet</p>
              <p className="text-xs text-muted-foreground">New signups will appear here.</p>
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-200px)] pr-4">
              <div className="space-y-3">
                {event.attendees.map((attendee: any) => (
                  <div
                    key={attendee.id}
                    className="flex items-center gap-4 p-3 rounded-lg border bg-card transition-hover hover:bg-accent/50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold truncate">
                        {attendee.name}
                      </span>
                      <div className="flex items-center text-xs text-muted-foreground truncate">
                        <Mail className="mr-1 h-3 w-3" />
                        {attendee.email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}