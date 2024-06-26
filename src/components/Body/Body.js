import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setJobs,
  setLoading,
  setFilter,
  setOffset,
  setAllDataLoaded,
} from "../../store/actions";
import JobCard from "../Common/JobCard";
import "./Body.css";
const Body = () => {
  const dispatch = useDispatch();
  const { jobs, loading, filters, offset, allDataLoaded } = useSelector(
    (state) => state.job
  );
  const loader = useRef(null);

  useEffect(() => {
    dispatch(setLoading(true));
    fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ limit: 10, offset: offset, ...filters }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.jdList.length > 0) {
          dispatch(setJobs(jobs.concat(data.jdList)));
        } else {
          dispatch(setAllDataLoaded(true));
        }
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.error("Failed to fetch jobs:", error);
        dispatch(setLoading(false));
      });
  }, [dispatch, offset]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && !loading && !allDataLoaded) {
        dispatch(setOffset(offset + 10));
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
  }, [loading, allDataLoaded, offset]);

  const filteredJobs = jobs.filter(
    (job) =>
      (!filters.minExperience ||
        job.minExp >= parseInt(filters.minExperience)) &&
      (!filters.companyName ||
        job.companyName
          .toLowerCase()
          .includes(filters.companyName.toLowerCase())) &&
      (!filters.location || job.location.toLowerCase() === filters.location) &&
      (!filters.techStack ||
        job.techStack?.toLowerCase() === filters.techStack.toLowerCase()) &&
      (!filters.role || job.jobRole.toLowerCase() === filters.role) &&
      (!filters.minBasePay ||
        job.minJdSalary >= parseInt(filters.minBasePay.replace("L", "")) * 1000)
  );

  const handleFilterChange = (filterName, value) => {
    dispatch(setFilter(filterName, value));
  };

  return (
    <div className="body-container">
      <div className="filters-container">
        <input
          type="text"
          className="input-filter"
          value={filters.companyName}
          onChange={(e) => handleFilterChange("companyName", e.target.value)}
          placeholder="Enter company name"
        />
        <select
          className="select-filter"
          value={filters.minExperience}
          onChange={(e) => handleFilterChange("minExperience", e.target.value)}
        >
          <option value="">Select Min Experience</option>
          {[1, 2, 3, 4, 5, 6].map((year) => (
            <option key={year} value={year}>
              {year} Years
            </option>
          ))}
        </select>
        <select
          className="select-filter"
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
        >
          <option value="">Select Location</option>
          {["Bangalore", "Remote", "Delhi", "Noida", "Gurgaon", "Pune"].map(
            (loc) => (
              <option key={loc} value={loc.toLowerCase()}>
                {loc}
              </option>
            )
          )}
        </select>
        <select
          className="select-filter"
          value={filters.techStack}
          onChange={(e) => handleFilterChange("techStack", e.target.value)}
        >
          <option value="">Select Tech Stack</option>
          {["MERN", "MEAN", "Python"].map((stack) => (
            <option key={stack} value={stack}>
              {stack}
            </option>
          ))}
        </select>
        <select
          className="select-filter"
          value={filters.role}
          onChange={(e) => handleFilterChange("role", e.target.value)}
        >
          <option value="">Select Role</option>
          {["Android", "Frontend", "Tech Lead", "Backend", "IOS"].map(
            (role) => (
              <option key={role} value={role.toLowerCase()}>
                {role}
              </option>
            )
          )}
        </select>
        <select
          className="select-filter"
          value={filters.minBasePay}
          onChange={(e) => handleFilterChange("minBasePay", e.target.value)}
        >
          <option value="">Select Minimum Base Pay</option>
          {["0L", "10L", "20L", "30L"].map((pay) => (
            <option key={pay} value={pay}>
              {pay}
            </option>
          ))}
        </select>
      </div>

      <div className="jobs-container">
        {" "}
        {/* Use the defined CSS class here */}
        {loading && <p>Loading...</p>}
        {!loading && filteredJobs.length === 0 && <p>No jobs found.</p>}
        {filteredJobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>

      {!allDataLoaded && (
        <div ref={loader} style={{ height: "100px", margin: "10px 0" }} />
      )}
    </div>
  );
};

export default Body;
