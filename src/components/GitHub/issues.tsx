import React, { useEffect, useState, ReactNode } from "react";
import axios from "axios";

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
    <div>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
              {issue.title} - {new Date(issue.created_at).toLocaleDateString()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentIssues;
