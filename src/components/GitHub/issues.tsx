import React, { useEffect, useState, ReactNode } from "react";
import axios from "axios";
import "./issues.css";

interface Issue {
  id: number;
  title: string;
  html_url: string;
  created_at: string;
  state: string;
}

interface RecentIssuesProps {
  children: ReactNode;
}

const RecentIssues: React.FC<RecentIssuesProps> = ({ children }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const repoUrl = typeof children === "string" ? children.trim() : "";

    if (!repoUrl) {
      setError("Repository URL is not provided");
      return;
    }

    const fetchIssues = async () => {
      const repoMatch = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!repoMatch) {
        setError("Invalid GitHub repository URL");
        return;
      }
      const [_, owner, repo] = repoMatch;

      try {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/issues`,
          {
            params: {
              state: "open",
              sort: "created",
              direction: "desc",
              per_page: 5, // Limit to 5 issues
            },
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          },
        );
        setIssues(response.data);
      } catch (err) {
        console.error("Error fetching issues:", err);
        setError("Failed to fetch issues");
      }
    };

    fetchIssues();
  }, [children]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="recent-issues">
      <h2>Recent Issues</h2>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id} className="issue-item">
            <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
              <div className="issue-title">{issue.title}</div>
              <div className="issue-date">
                {new Date(issue.created_at).toLocaleDateString()}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentIssues;
