import { Octokit } from "@octokit/rest";
import type { Service } from "@/core/interfaces/service";

type CreateIssuePayload = {
  title: string;
  body?: string;
};

export class GitHubServiceV2 implements Service {
  public readonly name = "github";

  private readonly client: Octokit;

  constructor() {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      throw new Error("GITHUB_TOKEN is not configured.");
    }

    this.client = new Octokit({
      auth: token,
    });
  }

  async execute(
    action: string,
    payload?: unknown
  ): Promise<unknown> {
    switch (action) {
      case "repo":
        return this.getRepository();

      case "issues":
        return this.listIssues();

      case "createIssue":
        return this.createIssue(payload);

      default:
        return {
          success: false,
          error: `Unknown GitHub action: ${action}`,
        };
    }
  }

  private owner(): string {
    const owner = process.env.GITHUB_OWNER;

    if (!owner) {
      throw new Error("GITHUB_OWNER is missing.");
    }

    return owner;
  }

  private repo(): string {
    const repo = process.env.GITHUB_REPO;

    if (!repo) {
      throw new Error("GITHUB_REPO is missing.");
    }

    return repo;
  }

  private async getRepository() {
    const response = await this.client.repos.get({
      owner: this.owner(),
      repo: this.repo(),
    });

    return response.data;
  }

  private async listIssues() {
    const response = await this.client.issues.listForRepo({
      owner: this.owner(),
      repo: this.repo(),
    });

    return response.data;
  }

  private async createIssue(payload?: unknown) {
    if (
      !payload ||
      typeof payload !== "object" ||
      !("title" in payload)
    ) {
      return {
        success: false,
        error: "Invalid payload",
      };
    }

    const issue = payload as CreateIssuePayload;

    const response = await this.client.issues.create({
      owner: this.owner(),
      repo: this.repo(),
      title: issue.title,
      body: issue.body,
    });

    return response.data;
  }
}

export const githubServiceV2 = new GitHubServiceV2();
