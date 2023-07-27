import Header from './header/page';
import Footer from './footer/page';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
       <Footer />
    </>
  );
}