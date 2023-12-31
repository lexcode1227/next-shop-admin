import "./tailwind.css"
import { Inter } from 'next/font/google';
import Header from "@/components/Header";
import Nav from "@/common/Nav";
import { ProviderAuth } from "@/hooks/useAuth";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next Shop Admin App',
  description: 'Generated by @lexcode',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ProviderAuth>
        <body className={inter.className}>
          <div className="min-h-full">
            <Header/>
            <Nav/>
            <main>
              <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </body>
      </ProviderAuth>
    </html>
  );
}
