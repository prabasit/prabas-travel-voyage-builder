import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Team from "./pages/Team";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import Blog from "./pages/Blog";
import Inquiries from "./pages/Inquiries";
import Awards from "./pages/Awards";
import Careers from "./pages/Careers";
import FlightsNepal from "./pages/FlightsNepal";
import PrabasHolidays from "./pages/PrabasHolidays";
import Dashboard from "./pages/admin/Dashboard";
import Pages from "./pages/admin/Pages";
import AdminAbout from "./pages/admin/About";
import TeamManagement from "./pages/admin/TeamManagement";
import ServicesManagement from "./pages/admin/ServicesManagement";
import CareerManagement from "./pages/admin/CareerManagement";
import CareerApplicationsManagement from "./pages/admin/CareerApplicationsManagement";
import BlogManagement from "./pages/admin/BlogManagement";
import TestimonialsManagement from "./pages/admin/TestimonialsManagement";
import AwardsManagement from "./pages/admin/AwardsManagement";
import InquiriesManagement from "./pages/admin/InquiriesManagement";
import NotFound from "./pages/NotFound";
import Settings from "./pages/admin/Settings";
import Login from "./pages/admin/Login";
import AdminManagement from "./pages/admin/AdminManagement";
import FlightsNepalManagement from "./pages/admin/FlightsNepalManagement";
import PrabasHolidaysManagement from "./pages/admin/PrabasHolidaysManagement";
import NewsletterManagement from "./pages/admin/NewsletterManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/inquiries" element={<Inquiries />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/flights-nepal" element={<FlightsNepal />} />
          <Route path="/prabas-holidays" element={<PrabasHolidays />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/pages" element={<Pages />} />
          <Route path="/admin/about" element={<AdminAbout />} />
          <Route path="/admin/team" element={<TeamManagement />} />
          <Route path="/admin/services" element={<ServicesManagement />} />
          <Route path="/admin/careers" element={<CareerManagement />} />
          <Route path="/admin/career-applications" element={<CareerApplicationsManagement />} />
          <Route path="/admin/blogs" element={<BlogManagement />} />
          <Route path="/admin/testimonials" element={<TestimonialsManagement />} />
          <Route path="/admin/awards" element={<AwardsManagement />} />
          <Route path="/admin/inquiries" element={<InquiriesManagement />} />
          <Route path="/admin/admin-management" element={<AdminManagement />} />
          <Route path="/admin/flights-nepal" element={<FlightsNepalManagement />} />
          <Route path="/admin/prabas-holidays" element={<PrabasHolidaysManagement />} />
          <Route path="/admin/newsletter" element={<NewsletterManagement />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
