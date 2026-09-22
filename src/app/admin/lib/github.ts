// Environment variables configuration helper
export function getEnvConfig() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const githubToken = process.env.GITHUB_PAT;
  const githubRepo = process.env.GITHUB_REPO;
  const githubBranch = process.env.GITHUB_BRANCH || "develop";

  return { adminPassword, githubToken, githubRepo, githubBranch };
}

const GITHUB_HEADERS = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "Culina-Admin-Uploader",
});

/**
 * Fetches the SHA of an existing file in the GitHub repo to allow updates.
 */
export async function getFileSha(
  path: string,
  token: string,
  repo: string,
  branch: string,
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`,
      {
        method: "GET",
        headers: GITHUB_HEADERS(token),
        cache: "no-store",
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data.sha;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching SHA for ${path}:`, error);
    return null;
  }
}

/**
 * Fetches the raw (decoded) content of a file from the GitHub repository.
 * Returns null if the file does not exist or an error occurs.
 */
export async function getFileContent(
  path: string,
  token: string,
  repo: string,
  branch: string,
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`,
      {
        method: "GET",
        headers: GITHUB_HEADERS(token),
        cache: "no-store",
      },
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (typeof data.content !== "string") return null;
    return Buffer.from(data.content, "base64").toString("utf-8");
  } catch (error) {
    console.error(`Error fetching content for ${path}:`, error);
    return null;
  }
}

/**
 * Pushes/updates a file in the GitHub repository.
 */
export async function pushToGithub(
  path: string,
  contentBase64: string,
  message: string,
  token: string,
  repo: string,
  branch: string,
): Promise<boolean> {
  const sha = await getFileSha(path, token, repo, branch);

  const body: {
    message: string;
    content: string;
    branch: string;
    sha?: string;
  } = {
    message,
    content: contentBase64,
    branch,
  };

  if (sha) {
    body.sha = sha;
  }

  const response = await fetch(
    `https://api.github.com/repos/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        ...GITHUB_HEADERS(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error(`Failed to push ${path} to GitHub:`, errText);
    return false;
  }

  return true;
}

/**
 * Deletes a file from the GitHub repository. Failures are logged but
 * non-fatal, since orphaned files do not break the site.
 */
export async function deleteFromGithub(
  path: string,
  message: string,
  token: string,
  repo: string,
  branch: string,
): Promise<boolean> {
  const sha = await getFileSha(path, token, repo, branch);
  if (!sha) return false;

  const response = await fetch(
    `https://api.github.com/repos/${repo}/contents/${path}`,
    {
      method: "DELETE",
      headers: {
        ...GITHUB_HEADERS(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, sha, branch }),
    },
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error(`Failed to delete ${path} from GitHub:`, errText);
    return false;
  }

  return true;
}
