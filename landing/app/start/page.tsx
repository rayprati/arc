import { StartPageUI } from "@/components/start-page-ui";

export const metadata = {
  title: "Start Your ARC",
  description: "Enter your email to get early access to ARC.",
};

export default function StartPage() {
  return <StartPageUI paymentLink={process.env.PAYMENT_LINK} />;
}
