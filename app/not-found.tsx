import { ErrorState, Link, PageContainer } from '@/components/system';

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex items-center bg-background">
      <PageContainer>
        <div className="mx-auto max-w-xl text-center space-y-8">
          <div className="font-serif italic text-7xl md:text-9xl text-foreground/15">404</div>
          <ErrorState
            message="SIGNAL LOST // ARTIFACT NOT FOUND"
            details="The requested coordinate does not exist in the current archive iteration."
            className="text-left"
          />
          <Link href="/" variant="cta" className="rounded-full px-8 py-4">
            RETURN TO CORE
          </Link>
        </div>
      </PageContainer>
    </div>
  );
}
