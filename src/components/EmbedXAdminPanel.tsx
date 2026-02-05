"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Member {
  name: string;
  srn: string;
  email: string;
  semester?: string;
  section?: string;
  payment_url?: string;
}

interface Registration {
  id: string;
  team_name: string;
  leader_name: string;
  leader_email: string;
  leader_phone: string;
  campus?: string;
  members: Member[];
  created_at: string;
  attendance?: boolean;
}

export default function EmbedXAdminPanel() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingCsv, setDownloadingCsv] = useState(false);

  useEffect(() => {
    fetch("/api/admin/embedx2_registrations")
      .then((res) => res.json())
      .then((data) => {
        setRegistrations(data.registrations || []);
        setLoading(false);
      })
      .catch((e) => {
        setError("Failed to load registrations");
        setLoading(false);
      });
  }, []);

  const filtered = registrations.filter((r) =>
    r.team_name.toLowerCase().includes(search.toLowerCase()) ||
    r.leader_name.toLowerCase().includes(search.toLowerCase()) ||
    r.leader_email.toLowerCase().includes(search.toLowerCase())
  );

  const markAttendance = async (id: string, value: boolean) => {
    await fetch("/api/admin/embedx2_registrations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, attendance: value }),
    });
    setRegistrations((registrations) =>
      registrations.map((r) => (r.id === id ? { ...r, attendance: value } : r))
    );
  };

  const downloadCsv = () => {
    setDownloadingCsv(true);
    fetch("/api/admin/embedx2_registrations")
      .then((res) => res.json())
      .then((data) => {
        const header = [
          "Team Name",
          "Leader Name",
          "Leader Email",
          "Leader Phone",
          "Campus",
          "Members",
          "Attendance",
          "Created At",
        ];
        const rows = (data.registrations || []).map((r: Registration) => [
          r.team_name,
          r.leader_name,
          r.leader_email,
          r.leader_phone,
          r.campus || "",
          r.members.map((m) => `${m.name} (${m.srn})`).join("; "),
          r.attendance ? "Present" : "Absent",
          r.created_at,
        ]);
        const csv = [header, ...rows]
          .map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(","))
          .join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `embedx2_registrations_${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      })
      .catch(() => {})
      .finally(() => setDownloadingCsv(false));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">EmbedX 2.0 Registrations</h2>
        <div className="flex items-center space-x-3">
          <input
            className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
            placeholder="Search by team, leader, or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={downloadCsv}
            disabled={downloadingCsv}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm"
          >
            {downloadingCsv ? "Downloading…" : "Download CSV"}
          </button>
        </div>
      </div>
      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((reg) => (
            <motion.div
              key={reg.id}
              className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{reg.team_name}</h3>
                  <p className="text-gray-400">Leader: {reg.leader_name}</p>
                  <p className="text-gray-400 text-sm">Submitted: {new Date(reg.created_at).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">Contact</p>
                  <p className="text-white">{reg.leader_email}</p>
                  <p className="text-white">{reg.leader_phone}</p>
                  <div className="mt-2">
                    <label className="text-sm text-white mr-2">Attendance</label>
                    <input
                      type="checkbox"
                      checked={!!reg.attendance}
                      onChange={(e) => markAttendance(reg.id, e.target.checked)}
                    />
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-700/50 pt-4">
                <h4 className="text-white font-semibold mb-2">Team Members ({reg.members.length})</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reg.members.map((member, index) => (
                    <div key={index} className="bg-gray-800/30 rounded-lg p-3">
                      <p className="text-white font-medium">{member.name}</p>
                      <p className="text-gray-400 text-sm">SRN: {member.srn}</p>
                      <p className="text-gray-400 text-sm">{member.email}</p>
                      {member.payment_url && (
                        <a
                          href={member.payment_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline block mt-1"
                        >
                          Payment Proof
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}