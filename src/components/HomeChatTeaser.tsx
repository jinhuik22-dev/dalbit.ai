"use client";

import { useState } from "react";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";

const ROLES = ["Creator", "Brand", "Agency", "Investor", "Other"];

function DalbitAvatar() {
  return (
    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-accent flex items-center justify-center">
      <span className="text-white text-xs font-bold leading-none">D</span>
    </div>
  );
}

export function HomeChatTeaser() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showReply, setShowReply] = useState(false);

  const handleSelect = (role: string) => {
    setSelectedRole(role);
    // Brief delay for typing feel
    setTimeout(() => setShowReply(true), 800);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-warm">
        {/* Dalbit message */}
        <div className="flex items-start gap-3 mb-5">
          <DalbitAvatar />
          <div className="bg-surface border border-border rounded-2xl rounded-tl-sm px-4 py-3">
            <p className="text-foreground text-sm leading-relaxed">
              Welcome to Dalbit. What best describes your role?
            </p>
          </div>
        </div>

        {/* Role pills */}
        {!selectedRole && (
          <div className="flex flex-wrap gap-2 ml-10 animate-fade-in-up">
            {ROLES.map((role) => (
              <Pill
                key={role}
                label={role}
                selected={false}
                onClick={() => handleSelect(role)}
              />
            ))}
          </div>
        )}

        {/* User answer */}
        {selectedRole && (
          <div className="flex justify-end mb-4 animate-fade-in-up">
            <div className="bg-foreground text-white rounded-2xl rounded-tr-sm px-4 py-3">
              <p className="text-sm leading-relaxed">{selectedRole}</p>
            </div>
          </div>
        )}

        {/* Typing indicator */}
        {selectedRole && !showReply && (
          <div className="flex items-start gap-3 animate-fade-in-up">
            <DalbitAvatar />
            <div className="bg-surface border border-border rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1.5">
                <span className="typing-dot w-2 h-2 rounded-full bg-warm-400" />
                <span className="typing-dot w-2 h-2 rounded-full bg-warm-400" />
                <span className="typing-dot w-2 h-2 rounded-full bg-warm-400" />
              </div>
            </div>
          </div>
        )}

        {/* Dalbit reply + CTA */}
        {showReply && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="flex items-start gap-3">
              <DalbitAvatar />
              <div className="bg-surface border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                <p className="text-foreground text-sm leading-relaxed">
                  Nice. Let&apos;s build your profile &mdash; it takes 2 minutes.
                </p>
              </div>
            </div>
            <div className="ml-10">
              <Button href={`/start?role=${encodeURIComponent(selectedRole!)}`} size="md">
                Continue &rarr;
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
