// src/components/VideoTutorialsPage.tsx

"use client";

import React from 'react';
import { AlertCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function VideoTutorialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white rounded-2xl shadow-lg p-6 mb-8 text-center border-t-4 border-blue-600">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">📚 Video Tutorials</h1>
          <p className="text-gray-600 text-lg">Complete Guide to Aadhaar Seeding for Direct Benefit Transfer (DBT)</p>
        </header>

        <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-lg shadow-md mb-8">
          <div className="flex items-start">
            <AlertCircle className="w-7 h-7 text-red-500 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-red-800 text-xl mb-2">⚠️ Important: Understand the Difference!</h3>
              <p className="text-red-700 text-base">Many students have Aadhaar-linked accounts but NOT seeded accounts, causing scholarship delays!</p>
            </div>
          </div>
        </div>

        {/* Tutorial 1: Check Seeding Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-t-4 border-purple-600">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-5 pb-4 border-b-2 border-purple-600">
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold">1</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-blue-700 mb-1">How to Check Aadhaar Seeding Status</h2>
              <p className="text-gray-600 text-base">Verify if your account is ready to receive DBT benefits</p>
            </div>
          </div>
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl mb-5 shadow-lg">
            <iframe className="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/x1OWO7VFSWU" allowFullScreen title="How to Check Aadhaar Seeding Status"></iframe>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-blue-700 mb-5 pl-3 border-l-4 border-blue-600">📋 Step-by-Step Text Guide</h3>
            <Accordion type="single" collapsible className="w-full mt-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold text-lg hover:no-underline">Method 1: Checking via MyAadhaar Website</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600 mb-4">This is the most reliable method. Follow these steps:</p>
                  <div className="space-y-2"><div className="bg-gray-50 p-3 rounded-md border-l-4 border-purple-500"><strong>Step 1:</strong> Visit <strong><a href="https://myaadhaar.uidai.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">myaadhaar.uidai.gov.in</a></strong> and click &quot;Login&quot;.</div><div className="bg-gray-50 p-3 rounded-md border-l-4 border-purple-500"><strong>Step 2:</strong> Enter your Aadhaar number, captcha, and the OTP sent to your phone.</div><div className="bg-gray-50 p-3 rounded-md border-l-4 border-purple-500"><strong>Step 3:</strong> On your dashboard, find and click the <strong>&quot;Bank Seeding Status&quot;</strong> service.</div><div className="bg-gray-50 p-3 rounded-md border-l-4 border-purple-500"><strong>Step 4:</strong> View your status. It will show the Bank Name and if the status is &quot;Active&quot;.</div></div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="font-semibold text-lg hover:no-underline">Alternative Methods (May be outdated)</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600 mb-4">These methods are less common but may work for some users.</p>
                  <div className="space-y-2"><div className="bg-gray-50 p-3 rounded-md border-l-4 border-purple-500"><strong>SMS:</strong> From your registered mobile, try sending an SMS to <strong>567676</strong>.</div><div className="bg-gray-50 p-3 rounded-md border-l-4 border-purple-500"><strong>USSD:</strong> From your registered phone, try dialing <strong>*99*99*1#</strong>.</div></div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Tutorial 2: Enable Seeding */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-t-4 border-green-600">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-5 pb-4 border-b-2 border-green-600">
            <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold">2</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-green-700 mb-1">How to Get Your Account Seeded</h2>
              <p className="text-gray-600 text-base">Follow these steps if your account is not seeded.</p>
            </div>
          </div>
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl mb-5 shadow-lg">
            <iframe className="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/6TzNVx1Rjio" allowFullScreen title="How to Enable Aadhaar Seeding"></iframe>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-green-700 mb-5 pl-3 border-l-4 border-green-600">📋 Step-by-Step Text Guide</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mb-4">
              <strong className="text-yellow-800">Prerequisites - What to bring to the bank:</strong>
              <ul className="list-disc ml-5 text-yellow-700 text-sm mt-2 space-y-1">
                <li>Your Original Aadhaar Card</li>
                <li>Your Bank Account Passbook</li>
                <li>The filled "Aadhaar Seeding Consent Form" (downloadable from our app)</li>
              </ul>
            </div>
            <p className="text-sm text-gray-600 mb-4">The most reliable method is to visit your bank branch in person.</p>
            <div className="space-y-2"><div className="bg-gray-50 p-3 rounded-md border-l-4 border-green-500"><strong>Step 1:</strong> Visit your bank branch during working hours.</div><div className="bg-gray-50 p-3 rounded-md border-l-4 border-green-500"><strong>Step 2:</strong> Tell the bank staff: &quot;I need to seed my account for DBT&quot;.</div><div className="bg-gray-50 p-3 rounded-md border-l-4 border-green-500"><strong>Step 3:</strong> Submit your filled form and documents.</div><div className="bg-gray-50 p-3 rounded-md border-l-4 border-green-500"><strong>Step 4:</strong> Wait 2-3 business days and then check your status again online.</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}