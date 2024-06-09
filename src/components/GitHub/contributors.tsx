import React, { useEffect, useState, ReactNode } from "react";
import axios from "axios";

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
    <div>
      <ul>
        {contributors.map((contributor) => (
          <li key={contributor.login}>
            <a
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                width="30"
              />
              {contributor.login} - {contributor.contributions} contributions
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopContributors;
