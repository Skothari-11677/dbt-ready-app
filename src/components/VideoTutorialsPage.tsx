// src/components/VideoTutorialsPage.tsx

"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Import the Accordion components

export default function VideoTutorialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white rounded-2xl shadow-lg p-6 mb-8 text-center border-t-4 border-blue-600">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">📚 Video Tutorials</h1>
          <p className="text-gray-600 text-lg">Complete Guide to Aadhaar Seeding for Direct Benefit Transfer (DBT)</p>
        </header>

        <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-lg shadow-md mb-8">
          {/* ... Alert Box content remains the same ... */}
        </div>

        {/* Tutorial 1: Check Seeding Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-t-4 border-purple-600">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-5 pb-4 border-b-2 border-purple-600">
            {/* ... Tutorial 1 Header remains the same ... */}
          </div>

          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl mb-5 shadow-lg">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/x1OWO7VFSWU"
              allowFullScreen
              title="How to Check Aadhaar Seeding Status"
            ></iframe>
          </div>
          <div className="text-center text-sm text-gray-700 bg-gray-100 p-3 rounded-lg">
             {/* ... YouTube link fallback remains the same ... */}
          </div>

          {/* === NEW ACCORDION SECTION TO MAKE THE PAGE CLEANER === */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-blue-700 mb-5 pl-3 border-l-4 border-blue-600">📋 Step-by-Step Text Guide</h3>
            
            <Accordion type="single" collapsible className="w-full mt-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold text-lg hover:no-underline">Method 1: Checking via MyAadhaar Website</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-500"><h4 className="text-purple-700 font-semibold mb-2">Step 1: Visit the MyAadhaar Portal</h4><ul className="list-disc ml-5 text-gray-700 text-sm space-y-1"><li>Navigate to <strong><a href="https://myaadhaar.uidai.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://myaadhaar.uidai.gov.in/</a></strong></li></ul></div>
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-500"><h4 className="text-purple-700 font-semibold mb-2">Step 2: Login to MyAadhaar</h4><ul className="list-disc ml-5 text-gray-700 text-sm space-y-1"><li>Click <strong>&quot;Login&quot;</strong> and enter your Aadhaar number & captcha.</li><li>Enter the OTP sent to your registered mobile number.</li></ul></div>
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-500"><h4 className="text-purple-700 font-semibold mb-2">Step 3: Access Bank Seeding Status</h4><ul className="list-disc ml-5 text-gray-700 text-sm space-y-1"><li>On your dashboard, find and click the <strong>&quot;Bank Seeding Status&quot;</strong> service.</li></ul></div>
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-500"><h4 className="text-purple-700 font-semibold mb-2">Step 4: View Your Status</h4><ul className="list-disc ml-5 text-gray-700 text-sm space-y-1"><li>The system will display the bank name, status (Active/Inactive), and last update date.</li></ul></div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="font-semibold text-lg hover:no-underline">Alternative Methods (SMS & USSD)</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-500"><h4 className="text-purple-700 font-semibold mb-2">SMS-Based Checking</h4><ul className="list-disc ml-5 text-gray-700 text-sm space-y-1"><li>Note: This method may be outdated.</li><li>From your registered mobile, send an SMS to <strong>567676</strong>.</li></ul></div>
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-500"><h4 className="text-purple-700 font-semibold mb-2">USSD Code</h4><ul className="list-disc ml-5 text-gray-700 text-sm space-y-1"><li>Note: This method may be outdated.</li><li>From your registered phone, dial <strong>*99*99*1#</strong>.</li><li>Follow the on-screen prompts.</li></ul></div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="font-semibold text-lg hover:no-underline">What do the results mean?</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg"><strong className="text-green-800">✅ Active Status:</strong> Your Aadhaar is successfully seeded. The bank shown is where you will receive your DBT benefits.</div>
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg"><strong className="text-red-800">⚠️ Inactive Status:</strong> There is an issue. You must visit your bank branch with your Aadhaar and passbook to complete the seeding process.</div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          {/* ==================================================== */}
        </div>

        {/* Tutorial 2 section remains the same */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-t-4 border-purple-600">
           {/* ... Tutorial 2 content ... */}
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl border-2 border-purple-400 text-center shadow-md">
           {/* ... Key Takeaway content remains the same ... */}
        </div>
      </div>
    </div>
  );
}