"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Calendar, Send, Linkedin, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";
import { SITE_CONFIG } from "@/lib/constants";

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Contact"
          title="Get in Touch"
          description="Connect with our investor relations team to discuss allocation opportunities and learn more about PrysmAlgo."
          align="left"
        />

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            {submitted ? (
              <Card className="border-success/30">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mb-4">
                    <Send className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent</h3>
                  <p className="text-muted">
                    Thank you for your inquiry. Our team will respond within 24 business hours.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold text-foreground mb-6">Send an Inquiry</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" required placeholder="John Smith" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required placeholder="john@company.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" name="subject" required placeholder="Investment Inquiry" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" name="message" required placeholder="Tell us about your investment objectives..." />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">Other Ways to Reach Us</h3>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-3 text-muted hover:text-accent transition-colors">
                    <Mail className="h-5 w-5 text-accent" />
                    {SITE_CONFIG.email}
                  </a>
                  <a href={`tel:${SITE_CONFIG.phoneTel}`} className="flex items-center gap-3 text-muted hover:text-accent transition-colors">
                    <Phone className="h-5 w-5 text-accent" />
                    {SITE_CONFIG.phone}
                  </a>
                  <div className="flex items-start gap-3 text-muted">
                    <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    {SITE_CONFIG.address}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#0A66C2]/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Linkedin className="h-6 w-6 text-[#0A66C2]" />
                  <h3 className="text-lg font-semibold text-foreground">LinkedIn</h3>
                </div>
                <p className="text-sm text-muted mb-4">
                  Follow PrysmAlgo on LinkedIn for company updates, insights, and institutional news.
                </p>
                <Button asChild variant="outline" className="w-full border-[#0A66C2]/30 text-[#0A66C2] hover:bg-[#0A66C2]/10">
                  <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    Visit LinkedIn Page
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-[#1877F2]/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Facebook className="h-6 w-6 text-[#1877F2]" />
                  <h3 className="text-lg font-semibold text-foreground">Facebook</h3>
                </div>
                <p className="text-sm text-muted mb-4">
                  Follow Prysm Algo on Facebook for updates, insights, and company news.
                </p>
                <Button asChild variant="outline" className="w-full border-[#1877F2]/30 text-[#1877F2] hover:bg-[#1877F2]/10">
                  <a href={SITE_CONFIG.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4" />
                    Visit Facebook Page
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-[#E1306C]/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Instagram className="h-6 w-6 text-[#E1306C]" />
                  <h3 className="text-lg font-semibold text-foreground">Instagram</h3>
                </div>
                <p className="text-sm text-muted mb-4">
                  Follow @algoprysm on Instagram for market insights and company updates.
                </p>
                <Button asChild variant="outline" className="w-full border-[#E1306C]/30 text-[#E1306C] hover:bg-[#E1306C]/10">
                  <a href={SITE_CONFIG.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4" />
                    Visit Instagram
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-[#25D366]/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="h-6 w-6 text-[#25D366]" />
                  <h3 className="text-lg font-semibold text-foreground">WhatsApp</h3>
                </div>
                <p className="text-sm text-muted mb-4">
                  Connect instantly with our investor relations team via WhatsApp for quick inquiries.
                </p>
                <Button asChild variant="whatsapp" className="w-full">
                  <a href={SITE_CONFIG.whatsapp} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-accent/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="h-6 w-6 text-accent" />
                  <h3 className="text-lg font-semibold text-foreground">Book a Consultation</h3>
                </div>
                <p className="text-sm text-muted mb-4">
                  Schedule a private strategy call with our team to discuss your investment objectives.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <a href={SITE_CONFIG.calendly} target="_blank" rel="noopener noreferrer">
                    <Calendar className="h-4 w-4" />
                    Schedule on Calendly
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-0">
                <div className="aspect-[16/9] bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-accent mx-auto mb-2" />
                    <p className="text-sm text-muted">Mumbai Office</p>
                    <p className="text-xs text-muted/60 mt-1">Map placeholder</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
