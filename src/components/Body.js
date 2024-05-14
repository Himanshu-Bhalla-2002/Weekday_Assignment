import React, { useEffect, useState, useRef } from "react";

const Body = () => {
  const [jobs, setJobs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const loader = useRef(null);

  useEffect(() => {
    if (allDataLoaded) return; // Stop fetching if all data has been loaded

    setLoading(true);
    const fetchJobs = async () => {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ limit: 10, offset }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setJobs((prev) => [...prev, ...data.jdList]);
        // Check if the fetched data is less than the limit, indicating all data is fetched
        if (data.jdList.length < 10) {
          setAllDataLoaded(true);
        }
      } else {
        console.error("Failed to fetch jobs:", response.status);
      }
      setLoading(false);
    };

    fetchJobs();
  }, [offset, allDataLoaded]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && !loading && !allDataLoaded) {
        setOffset((prev) => prev + 10);
      }
    }, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loading, allDataLoaded]);

  return (
    <div>
      {jobs.map((job, index) => (
        <div
          key={index}
          style={{ margin: "20px", border: "1px solid #ccc", padding: "10px" }}
        >
          <h3>
            {job.jobRole} at {job.companyName}
          </h3>
          <img
            src={job.logoUrl}
            alt={job.companyName}
            style={{ height: "50px" }}
          />
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Experience:</strong> {job.minExp} to {job.maxExp} years
          </p>
          {job.minJdSalary && job.maxJdSalary ? (
            <p>
              <strong>Salary:</strong> USD {job.minJdSalary}k - USD{" "}
              {job.maxJdSalary}k
            </p>
          ) : (
            <p>
              <strong>Salary:</strong> Data not available
            </p>
          )}
          <p>{job.jobDetailsFromCompany}</p>
          <a href={job.jdLink} target="_blank" rel="noopener noreferrer">
            Apply Here
          </a>
        </div>
      ))}
      {loading && <p>Loading more jobs...</p>}
      {!allDataLoaded && (
        <div ref={loader} style={{ height: "100px", margin: "10px 0" }} />
      )}
    </div>
  );
};

export default Body;
