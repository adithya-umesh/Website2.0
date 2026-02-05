"use client";
import { useEffect, useState } from 'react';

interface Registration {
  id: string;
  team_name: string;
  leader_name: string;
  leader_email: string;
  leader_phone: string;
  campus?: string;
  members: any[];
  payment_screenshot_url?: string;
  created_at: string;
  attendance?: boolean;
}

export default function AdminEmbedx2Page() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/embedx2_registrations')
      .then(res => res.json())
      .then(data => {
        setRegistrations(data.registrations || []);
        setLoading(false);
      })
      .catch(e => {
        setError('Failed to load registrations');
        setLoading(false);
      });
  }, []);

  const filtered = registrations.filter(r =>
    r.team_name.toLowerCase().includes(search.toLowerCase()) ||
    r.leader_name.toLowerCase().includes(search.toLowerCase()) ||
    r.leader_email.toLowerCase().includes(search.toLowerCase())
  );

  const markAttendance = async (id: string, value: boolean) => {
    await fetch('/api/admin/embedx2_registrations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, attendance: value })
    });
    setRegistrations(registrations =>
      registrations.map(r => r.id === id ? { ...r, attendance: value } : r)
    );
  };

  const downloadHostelCsv = () => {
    window.open('/api/admin/embedx2_registrations?export=hostel', '_blank');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">EmbedX 2.0 Registrations</h1>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
        <input
          className="border px-3 py-2 rounded w-full sm:w-auto"
          placeholder="Search by team, leader, or email"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={downloadHostelCsv}
        >
          Download Hostel CSV
        </button>
      </div>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th>Team Name</th>
              <th>Leader</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Campus</th>
              <th>Members</th>
              <th>Payment Proof</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(reg => (
              <tr key={reg.id} className="border-b">
                <td>{reg.team_name}</td>
                <td>{reg.leader_name}</td>
                <td>{reg.leader_email}</td>
                <td>{reg.leader_phone}</td>
                <td>{reg.campus}</td>
                <td>
                  <ul>
                    {reg.members?.map((m, i) => (
                      <li key={i}>{m.name} ({m.srn})</li>
                    ))}
                  </ul>
                </td>
                <td>
                  {reg.payment_screenshot_url ? (
                    <a href={reg.payment_screenshot_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a>
                  ) : '—'}
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={!!reg.attendance}
                    onChange={e => {
                      // Prevent double submit
                      if (reg.attendance !== e.target.checked) markAttendance(reg.id, e.target.checked);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
