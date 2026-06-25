import { subDays, format } from 'date-fns';

export type EventType = 'Wedding' | 'Party' | 'Interview' | 'Date Night' | 'Festival' | 'Birthday' | 'Graduation';
export type TaskCategory = 'Skin Care' | 'Hair Care' | 'Makeup' | 'Appointments' | 'Wellness' | 'Outfit';

export interface TimelineTask {
  id: string;
  text: string;
  category: TaskCategory;
  completed: boolean;
  isEcosystemRecommendation?: boolean;
}

export interface TimelineMilestone {
  id: string;
  dateLabel: string;
  offsetLabel: string;
  daysBefore: number;
  tasks: TimelineTask[];
}

export interface EventPlan {
  id: string;
  eventType: EventType;
  targetDate: Date;
  milestones: TimelineMilestone[];
  readinessScore: number;
  totalTasks: number;
  completedTasks: number;
}

class EventPlannerService {
  
  public generateTimeline(eventType: EventType, targetDate: Date): EventPlan {
    const milestones: TimelineMilestone[] = [];
    
    // Base templates by event type
    switch (eventType) {
      case 'Wedding':
        milestones.push(
          this.createMilestone(targetDate, 30, [
            { id: 'w1', text: 'Trial Makeup Session', category: 'Makeup', completed: false },
            { id: 'w2', text: 'Hair Consultation & Trial', category: 'Hair Care', completed: false },
            { id: 'w3', text: 'Begin intensive hydration focus', category: 'Skin Care', completed: false, isEcosystemRecommendation: true }
          ]),
          this.createMilestone(targetDate, 14, [
            { id: 'w4', text: 'Deep Facial Treatment', category: 'Appointments', completed: false },
            { id: 'w5', text: 'Final Dress Coordination', category: 'Outfit', completed: false }
          ]),
          this.createMilestone(targetDate, 7, [
            { id: 'w6', text: 'Final Hair Trim', category: 'Appointments', completed: false, isEcosystemRecommendation: true },
            { id: 'w7', text: 'Stress-relief massage', category: 'Wellness', completed: false }
          ]),
          this.createMilestone(targetDate, 2, [
            { id: 'w8', text: 'Nail Appointment (Manicure/Pedicure)', category: 'Appointments', completed: false },
            { id: 'w9', text: 'Drink 3L water daily', category: 'Wellness', completed: false }
          ]),
          this.createMilestone(targetDate, 0, [
            { id: 'w10', text: 'Get enough sleep!', category: 'Wellness', completed: false },
            { id: 'w11', text: 'Event Day Makeup Application', category: 'Makeup', completed: false },
            { id: 'w12', text: 'Style: Curtain Bangs (Recommended)', category: 'Hair Care', completed: false, isEcosystemRecommendation: true }
          ])
        );
        break;

      case 'Interview':
        milestones.push(
          this.createMilestone(targetDate, 7, [
            { id: 'i1', text: 'Professional Hair Trim', category: 'Hair Care', completed: false },
            { id: 'i2', text: 'Outfit Selection & Ironing', category: 'Outfit', completed: false }
          ]),
          this.createMilestone(targetDate, 2, [
            { id: 'i3', text: 'Skin Refresh & Exfoliation', category: 'Skin Care', completed: false },
            { id: 'i4', text: 'Nail Grooming', category: 'Appointments', completed: false }
          ]),
          this.createMilestone(targetDate, 0, [
            { id: 'i5', text: 'Light, professional makeup', category: 'Makeup', completed: false },
            { id: 'i6', text: 'Review portfolio', category: 'Wellness', completed: false }
          ])
        );
        break;

      case 'Festival':
        milestones.push(
          this.createMilestone(targetDate, 14, [
            { id: 'f1', text: 'Plan trend makeup look', category: 'Makeup', completed: false },
            { id: 'f2', text: 'Hair Color Planning', category: 'Hair Care', completed: false }
          ]),
          this.createMilestone(targetDate, 3, [
            { id: 'f3', text: 'Intense Hydration Mask', category: 'Skin Care', completed: false, isEcosystemRecommendation: true },
            { id: 'f4', text: 'Outfit fitting', category: 'Outfit', completed: false }
          ])
        );
        break;

      default: // Party, Date Night, Birthday, Graduation
        milestones.push(
          this.createMilestone(targetDate, 10, [
            { id: 'd1', text: 'Glow Facial Treatment', category: 'Skin Care', completed: false },
            { id: 'd2', text: 'Hairstyle Selection (Curtain Bangs)', category: 'Hair Care', completed: false, isEcosystemRecommendation: true }
          ]),
          this.createMilestone(targetDate, 1, [
            { id: 'd3', text: 'Photo-Ready Makeup Prep', category: 'Makeup', completed: false },
            { id: 'd4', text: 'Outfit Check', category: 'Outfit', completed: false }
          ])
        );
        break;
    }

    const totalTasks = milestones.reduce((sum, m) => sum + m.tasks.length, 0);

    return {
      id: Date.now().toString(),
      eventType,
      targetDate,
      milestones,
      readinessScore: 0,
      totalTasks,
      completedTasks: 0
    };
  }

  private createMilestone(targetDate: Date, daysBefore: number, tasks: TimelineTask[]): TimelineMilestone {
    const milestoneDate = subDays(targetDate, daysBefore);
    let offsetLabel = `${daysBefore} Days Before`;
    if (daysBefore === 0) offsetLabel = "Event Day";
    if (daysBefore === 1) offsetLabel = "1 Day Before";

    return {
      id: `ms-${daysBefore}`,
      dateLabel: format(milestoneDate, 'MMMM d, yyyy'),
      offsetLabel,
      daysBefore,
      tasks
    };
  }
}

export const eventPlanner = new EventPlannerService();
