import { Card } from "@/components/ui/card";
import { Settings, Database, Shield, Bell } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Admin Settings</h1>
        <p className="mt-1 text-white/50">
          Configure platform settings and preferences
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-6">
        {/* General Settings */}
        <Card className="border-white/5 bg-white/2 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 p-2">
              <Settings className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-white">General Settings</h2>
          </div>
          <p className="mt-4 text-sm text-white/50">
            General platform settings will be available here. This includes site name, 
            description, and other global configurations.
          </p>
          <div className="mt-4 rounded-lg bg-white/5 p-4 text-center text-sm text-white/40">
            Coming soon
          </div>
        </Card>

        {/* Database Settings */}
        <Card className="border-white/5 bg-white/2 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-linear-to-br from-green-500 to-emerald-500 p-2">
              <Database className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-white">Database</h2>
          </div>
          <p className="mt-4 text-sm text-white/50">
            Database management, backups, and maintenance tools.
          </p>
          <div className="mt-4 rounded-lg bg-white/5 p-4 text-center text-sm text-white/40">
            Coming soon
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="border-white/5 bg-white/2 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-linear-to-br from-red-500 to-orange-500 p-2">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-white">Security</h2>
          </div>
          <p className="mt-4 text-sm text-white/50">
            Security settings, authentication providers, and access controls.
          </p>
          <div className="mt-4 rounded-lg bg-white/5 p-4 text-center text-sm text-white/40">
            Coming soon
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="border-white/5 bg-white/2 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-linear-to-br from-purple-500 to-pink-500 p-2">
              <Bell className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
          </div>
          <p className="mt-4 text-sm text-white/50">
            Email templates, notification preferences, and alert configurations.
          </p>
          <div className="mt-4 rounded-lg bg-white/5 p-4 text-center text-sm text-white/40">
            Coming soon
          </div>
        </Card>
      </div>
    </div>
  );
}

