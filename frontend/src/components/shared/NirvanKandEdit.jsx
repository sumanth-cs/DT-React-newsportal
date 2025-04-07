import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const NirvanKandEdit = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ title: "", subtitle: "", shlokas: [] });
  const [docId, setDocId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/nirvankand");
        const data = await res.json();
        if (res.ok) {
          setDocId(data._id);
          setForm({
            title: data.title,
            subtitle: data.subtitle,
            shlokas: data.shlokas,
          });
        } else {
          console.error("Error fetching data:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleShlokChange = (index, value) => {
    const newShlokas = [...form.shlokas];
    newShlokas[index] = value;
    setForm({ ...form, shlokas: newShlokas });
  };

  const addShlok = () => {
    setForm({ ...form, shlokas: [...form.shlokas, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/nirvankand/${docId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast("Content Updated Successfully!");
      } else {
        console.error("Error updating content:", await res.json());
      }
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#470408]">
        Edit Nirvan Kand
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-lg font-semibold mb-2">Title</h3>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#470408] transition"
        />
        <input
          type="text"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          placeholder="Subtitle"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#470408] transition"
        />

        <div>
          <h3 className="text-lg font-semibold mb-2">Shlokas</h3>
          {form.shlokas.map((shlok, idx) => (
            <textarea
              key={idx}
              rows={2}
              value={shlok}
              onChange={(e) => handleShlokChange(idx, e.target.value)}
              placeholder={`Shlok ${idx + 1}`}
              className="w-full mb-3 p-3 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-[#470408] transition"
            />
          ))}
        </div>

        <button
          type="button"
          onClick={addShlok}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition"
        >
          ➕ Add Shlok
        </button>

        <div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#470408] hover:bg-[#350306] text-white font-semibold rounded-md transition"
          >
            💾 Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default NirvanKandEdit;
