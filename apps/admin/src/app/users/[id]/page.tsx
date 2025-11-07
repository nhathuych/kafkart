import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Progress } from '@/components/ui/progress';
import { BadgeCheck, Candy, Citrus, Shield } from 'lucide-react';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import EditUser from '@/components/EditUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppLineChart from '@/components/AppLineChart';

const SingleUserPage = () => {
  return (
    <div className=''>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/users'>Users</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>John Doe</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* CONTAINER */}
      <div className='flex xl:flex-row flex-col gap-8 mt-4'>
        {/* LEFT */}
        <div className='space-y-6 w-full xl:w-1/3'>
          {/* USER BADGES CONTAINER */}
          <div className='bg-primary-foreground p-4 rounded-lg'>
            <h1 className='font-semibold text-xl'>User Badges</h1>
            <div className='flex gap-4 mt-4'>
              <HoverCard>
                <HoverCardTrigger>
                  <BadgeCheck
                    size={36}
                    className='bg-blue-500/30 p-2 border border-blue-500/50 rounded-full'
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1 className='mb-2 font-bold'>Verified User</h1>
                  <p className='text-muted-foreground text-sm'>
                    This user has been verified by the admin.
                  </p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <Shield
                    size={36}
                    className='bg-green-800/30 p-2 border border-green-800/50 rounded-full'
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1 className='mb-2 font-bold'>Admin</h1>
                  <p className='text-muted-foreground text-sm'>
                    Admin users have access to all features and can manage
                    users.
                  </p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <Candy
                    size={36}
                    className='bg-yellow-500/30 p-2 border border-yellow-500/50 rounded-full'
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1 className='mb-2 font-bold'>Awarded</h1>
                  <p className='text-muted-foreground text-sm'>
                    This user has been awarded for their contributions.
                  </p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <Citrus
                    size={36}
                    className='bg-orange-500/30 p-2 border border-orange-500/50 rounded-full'
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1 className='mb-2 font-bold'>Popular</h1>
                  <p className='text-muted-foreground text-sm'>
                    This user has been popular in the community.
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
          {/* USER CARD CONTAINER */}
          <div className='space-y-2 bg-primary-foreground p-4 rounded-lg'>
            <div className='flex items-center gap-2'>
              <Avatar className='size-12'>
                <AvatarImage src='https://avatars.githubusercontent.com/u/1486366' />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <h1 className='font-semibold text-xl'>John Doe</h1>
            </div>
            <p className='text-muted-foreground text-sm'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
              voluptas distinctio ab ipsa commodi fugiat labore quos veritatis
              cum corrupti sed repudiandae ipsum, harum recusandae ratione ipsam
              in, quis quia.
            </p>
          </div>
          {/* INFORMATION CONTAINER */}
          <div className='bg-primary-foreground p-4 rounded-lg'>
            <div className='flex justify-between items-center'>
              <h1 className='font-semibold text-xl'>User Information</h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button>Edit User</Button>
                </SheetTrigger>
                <EditUser />
              </Sheet>
            </div>
            <div className='space-y-4 mt-4'>
              <div className='flex flex-col gap-2 mb-8'>
                <p className='text-muted-foreground text-sm'>
                  Profile completion
                </p>
                <Progress value={66} />
              </div>
              <div className='flex items-center gap-2'>
                <span className='font-bold'>Full name:</span>
                <span>John Doe</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='font-bold'>Email:</span>
                <span>john.doe@gmail.com</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='font-bold'>Phone:</span>
                <span>+1 234 5678</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='font-bold'>Address:</span>
                <span>123 Main St</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='font-bold'>City:</span>
                <span>New York</span>
              </div>
            </div>
            <p className='mt-4 text-muted-foreground text-sm'>
              Joined on 2025.01.01
            </p>
          </div>
        </div>
        {/* RIGHT */}
        <div className='space-y-6 w-full xl:w-2/3'>
          
          {/* CHART CONTAINER */}
          <div className='bg-primary-foreground p-4 rounded-lg'>
            <h1 className='font-semibold text-xl'>User Activity</h1>
            <AppLineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
