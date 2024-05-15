import React, { useState } from "react";
import PropTypes from "prop-types";
import "./JobCard.css";
import tick from "../../assets/tick.png";

const capitalizeWords = (str) =>
  str.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());

const JobCard = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const hasLongDescription = job.jobDetailsFromCompany.length > 300;

  return (
    <div className="job-card">
      <div className="job-card-container">
        {/* Job Details */}
        <div className="job-detail-header">
          <img
            className="job-logo"
            src={job.logoUrl}
            alt={`${job.companyName} logo`}
          />
          <div className="job-info">
            <a
              href={job.jdLink}
              target="_blank"
              rel="noopener noreferrer"
              className="company-name"
            >
              {job.companyName}
            </a>
            <div className="job-role">{capitalizeWords(job.jobRole)}</div>
            <div className="job-location">
              Location: {capitalizeWords(job.location)} | Exp: {job.minExp}-
              {job.maxExp} years
            </div>
          </div>
        </div>
        {/* Salary */}
        <div className="job-salary">
          <span>
            Salary: USD {job.minJdSalary || "0"}k - USD {job.maxJdSalary || "0"}
            k
          </span>
          <img src={tick} alt="tick-icon" className="salary-tick" />
        </div>
        {/* Company Details */}
        <div className="job-description">
          {expanded
            ? job.jobDetailsFromCompany
            : `${job.jobDetailsFromCompany.substring(0, 300)}...`}
          {hasLongDescription && (
            <button onClick={toggleExpand} className="read-more">
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
        {/* Apply Link */}
        <a
          href={job.jdLink}
          target="_blank"
          rel="noopener noreferrer"
          className="apply-link"
        >
          Apply Here
        </a>
      </div>
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobCard;
