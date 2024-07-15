import React, { useEffect, useState, ReactNode } from "react";
import axios from "axios";
import "./contributors.css";

interface TopContributorsProps {
  children: ReactNode;
}

interface Contributor {
  login: string;
  contributions: number;
  avatar_url: string;
  html_url: string;
}

const TopContributors: React.FC<TopContributorsProps> = ({ children }) => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const repoUrl = typeof children === "string" ? children.trim() : "";

    const fetchContributors = async () => {
      if (!repoUrl) {
        setError("Repository URL is not provided");
        return;
      }

      try {
        const { owner, repo } = parseRepoUrl(repoUrl);
        console.log("Fetching contributors for:", owner, repo);
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/contributors`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          },
        );
        setContributors(response.data);
      } catch (err) {
        console.error("Error fetching contributors:", err);
        setError("Failed to fetch contributors");
      }
    };

    fetchContributors();
  }, [children]);

  const parseRepoUrl = (url: string) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      throw new Error("Invalid GitHub repository URL");
    }
    return { owner: match[1], repo: match[2] };
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="top-contributors">
      <ul>
        <li className="header">
          <span className="header-rank">#</span>
          <span className="header-user">User</span>
          <span className="header-contributions">Commits</span>
        </li>
        {contributors.map((contributor, index) => (
          <li key={contributor.login} className="contributor-item">
            <span className="contributor-rank">{index + 1}</span>
            <a
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="contributor-link"
            >
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                className="contributor-avatar"
              />
              <span className="contributor-name">{contributor.login}</span>
            </a>
            <span className="contributor-contributions">
              {contributor.contributions.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopContributors;
