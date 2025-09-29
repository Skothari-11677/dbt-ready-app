// src/components/ActionNeededScreen.tsx

"use client";

import { useState } from "react";
import { AlertTriangle, Loader2, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActionNeededScreen() {
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [showOfflineMap, setShowOfflineMap] = useState(false);

  // Common bank branches data for offline map
  const commonBanks = [
    { name: "State Bank of India", type: "Nationalised", address: "Main Branch - City Center" },
    { name: "Punjab National Bank", type: "Nationalised", address: "Central Office - Market Area" },
    { name: "Bank of Baroda", type: "Nationalised", address: "Regional Branch - Commercial District" },
    { name: "Canara Bank", type: "Nationalised", address: "Local Branch - Shopping Complex" },
    { name: "Union Bank of India", type: "Nationalised", address: "Branch Office - Business District" },
    { name: "Bank of India", type: "Nationalised", address: "Main Office - Government Area" },
    { name: "Central Bank of India", type: "Nationalised", address: "City Branch - Transport Hub" },
    { name: "Indian Bank", type: "Nationalised", address: "Local Office - Residential Area" },
  ];

  const handleDownloadPdf = () => {
    window.location.href = '/Aadhaar_Seeding_Consent_Form.pdf';
  };

  const handleFindBank = () => {
    console.log("Find My Bank button clicked");
    setIsFindingLocation(true);

    if (navigator.geolocation) {
      console.log("Geolocation is supported, requesting position...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Position obtained:", position.coords);
          const { latitude, longitude } = position.coords;
          const query = encodeURIComponent("Nationalised bank branches near me");
          const mapUrl = `https://www.google.com/maps/search/?api=1&query=${query}&ll=${latitude},${longitude}`;
          console.log("Opening map URL:", mapUrl);
          
          // Try to open the map, if blocked show offline map as fallback
          const newWindow = window.open(mapUrl, '_blank');
          if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
            console.log("Pop-up blocked, showing offline map instead");
            setShowOfflineMap(true);
          }
          setIsFindingLocation(false);
        },
        (error) => {
          console.error("Geolocation error:", error.message, "Code:", error.code);
          alert(`Location access ${error.code === 1 ? 'denied' : 'failed'}. Showing offline bank directory instead.`);
          setShowOfflineMap(true);
          setIsFindingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser");
      alert("Location services not available. Showing offline bank directory instead.");
      setShowOfflineMap(true);
      setIsFindingLocation(false);
    }
  };

  return (
    <>
      <main className="min-h-svh px-4 py-8">
        <div className="mx-auto flex max-w-sm flex-col items-center text-center">
          <AlertTriangle className="h-14 w-14 text-destructive" aria-hidden="true" />
          <h1 className="text-balance text-2xl font-semibold text-destructive mt-4">Action Needed: Account Not Seeded</h1>
          <p className="mt-3 text-pretty text-sm text-muted-foreground">{"Follow these steps to fix this:"}</p>

          <ol className="mt-6 w-full space-y-3">
            {/* Step 1 */}
            <li className="flex items-center gap-3 rounded-md border border-border p-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-sm font-medium text-destructive">1</span>
              <span className="flex-1 text-left text-sm">Download the Bank Consent Form</span>
              <Button size="sm" onClick={handleDownloadPdf}>
                {"Download PDF"}
              </Button>
            </li>
            {/* Step 2 */}
            <li className="flex items-center gap-3 rounded-md border border-border p-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-sm font-medium text-destructive">2</span>
              <span className="flex-1 text-left text-sm">Visit your nearest bank branch</span>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setShowOfflineMap(true)}
                  >
                    <MapPin className="h-3 w-3" />
                    Offline Map
                  </Button>
                  <Button size="sm" onClick={handleFindBank} disabled={isFindingLocation}>
                    {isFindingLocation ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isFindingLocation ? "Finding..." : "Find My Bank"}
                  </Button>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => {
                    const query = encodeURIComponent("Nationalised bank branches near me");
                    window.open(`https://maps.google.com/?q=${query}`, '_blank');
                  }}
                  className="text-xs"
                >
                  Or search manually on Google Maps
                </Button>
              </div>
            </li>
            {/* Step 3 */}
            <li className="flex items-center gap-3 rounded-md border border-border p-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-sm font-medium text-destructive">3</span>
              <span className="flex-1 text-left text-sm">Submit the form to the bank official</span>
            </li>
          </ol>
        </div>
      </main>

      {/* Offline Map Modal */}
      {showOfflineMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold">Nearby Nationalised Banks</h2>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowOfflineMap(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Visit any nationalised bank branch near you. Ask for "Aadhaar Seeding" or "DBT Registration" service.
                </p>
              </div>

              <div className="space-y-3">
                {commonBanks.map((bank, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{bank.name}</h3>
                      <p className="text-sm text-gray-600">{bank.address}</p>
                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                        {bank.type} Bank
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          const query = encodeURIComponent(`${bank.name} branches near me`);
                          window.open(`https://maps.google.com/?q=${query}`, '_blank');
                        }}
                      >
                        Directions
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">What to bring:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Original Aadhaar Card</li>
                  <li>• Bank Account Passbook</li>
                  <li>• Filled Consent Form (downloaded from Step 1)</li>
                  <li>• Valid Photo ID</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowOfflineMap(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    const query = encodeURIComponent("Nationalised bank branches near me");
                    window.open(`https://maps.google.com/?q=${query}`, '_blank');
                  }}
                  className="flex-1"
                >
                  Open in Google Maps
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}