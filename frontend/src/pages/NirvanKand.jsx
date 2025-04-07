import React, { useEffect, useState } from "react";

const NirvanKand = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/nirvankand");
        const data = await res.json();
        if (res.ok) {
          setData(data);
        } else {
          console.error("Error fetching data:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error); 
      }
    };
    fetchData();
  }, []);

  if (!data) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="font-sans bg-gray-100 min-h-screen p-4">
      <header className="bg-[#470408d3] text-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <h3 className="text-lg mt-2">{data.subtitle}</h3>
      </header>

      <main>
        <article className="max-w-2xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
          <ul className="space-y-4">
            {data.shlokas.map((line, index) => (
              <React.Fragment key={index}>
                <li
                  className="text-gray-800 font-semibold text-lg"
                  dangerouslySetInnerHTML={{ __html: line }}
                />
                {index < data.shlokas.length - 1 && <hr className="border-t border-gray-200" />}
              </React.Fragment>
            ))}
          </ul>
        </article>
      </main>
    </div>
  );
};

export default NirvanKand;
