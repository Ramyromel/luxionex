import { Octokit } from "@octokit/rest";
import type { Service } from "@/core/interfaces/service";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export class GitHubService implements Service {
  name = "github";

  async execute(action: string, payload?: any) {
    switch (action) {
      case "repo":
        return this.repo();

      case "createIssue":
        return this.createIssue(payload);

      default:
        return {
          success: false,
          error: `Unknown action: ${action}`,
        };
    }
  }

  async repo() {
    return octokit.repos.get({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
    }).then(r => r.data);
  }

  async createIssue(payload: { title: string; body?: string }) {
    return octokit.issues.create({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      title: payload.title,
      body: payload.body,
    }).then(r => r.data);
  }
}

export const githubService = new GitHubService();
