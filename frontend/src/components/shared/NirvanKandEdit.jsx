import React, { use, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const NirvanKandEdit = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ title: "", subtitle: "", shlokas: [] });
  const [docId, setDocId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/nirvan-kand");
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
      const res = await fetch(`/api/nirvan-kand/${docId}`, {
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
    <div style={{ padding: "20px" }}>
      <h2>Edit Nirvan Kand</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <input
          type="text"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          placeholder="Subtitle"
          style={{ width: "100%", marginBottom: "20px" }}
        />

        <h3>Shlokas</h3>
        {form.shlokas.map((shlok, idx) => (
          <textarea
            key={idx}
            rows={2}
            value={shlok}
            onChange={(e) => handleShlokChange(idx, e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        ))}

        <button
          type="button"
          onClick={addShlok}
          style={{ marginBottom: "20px" }}
        >
          ➕ Add Shlok
        </button>
        <br />
        <button type="submit">💾 Save Changes</button>
      </form>
    </div>
  );
};

export default NirvanKandEdit;
