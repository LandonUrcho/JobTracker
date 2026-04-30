import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex-1 bg-[url('/background.png')] bg-cover bg-center flex items-center">
      <div className="flex flex-col justify-center items-start h-full w-[40%] px-8">
        <div className="text-8xl font-bold text-white m-4"> 
          Welcome to Job Tracker
        </div>
        <div className="text-3xl m-4">
          Organize and maintain all of your job applications in one centralized location. Track your progress, set reminders, and stay on top of your job search with ease.
        </div>
        
          <Link
            href="/login"
            className="text-2xl font-semibold text-neutral-800 hover:text-white hover:scale-101 m-2 px-6 transition-colors"
          >
            Get Started &gt;
          </Link>
        </div>
        
      <div className="flex flex-col gap-4 w-[35%] h-full justify-center pr-16 ml-auto">
        <div className="bg-background-secondary/80 rounded-lg border border-border p-6 backdrop-blur-sm hover:bg-background-secondary/90 transition-colors flex items-center gap-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-2">Track Applications</h3>
            <p className="text-foreground-secondary text-md">
              Keep detailed records of every job application including company info, position details, salary expectations, and application dates all in one place.
            </p>
          </div>
          <div className="w-24 h-24 flex-shrink-0 relative">
            <Image src="/application.jpg" alt="Track Applications" fill className="object-cover rounded" />
          </div>
        </div>

        <div className="bg-background-secondary/80 rounded-lg border border-border p-6 backdrop-blur-sm hover:bg-background-secondary/90 transition-colors flex items-center gap-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-2">Schedule Interviews</h3>
            <p className="text-foreground-secondary text-md">
              Manage interview dates, times, and locations. Add notes, prepare talking points, and receive reminders to stay organized throughout your job search.
            </p>
          </div>
          <div className="w-24 h-24 flex-shrink-0 relative">
            <Image src="/interview.jpg" alt="Schedule Interviews" fill className="object-cover rounded" />
          </div>
        </div>

        <div className="bg-background-secondary/80 rounded-lg border border-border p-6 backdrop-blur-sm hover:bg-background-secondary/90 transition-colors flex items-center gap-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-2">Analytics & Insights</h3>
            <p className="text-foreground-secondary text-md">
              Visualize your job search progress with comprehensive statistics. Track success rates, identify trends, and optimize your application strategy.
            </p>
          </div>
          <div className="w-24 h-24 flex-shrink-0 relative">
            <Image src="/analytics.jpg" alt="Analytics & Insights" fill className="object-cover rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
