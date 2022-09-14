export type ChangeType = "added" | "modified" | "removed";

export type NodeHasChangedFn<R = unknown> = (props: {
  nodeId: string;
  mode?: "read" | "write";
  attr?: string | string[];
}) =>
  | false
  | {
      type: ChangeType;
      selfAffected?: boolean;
      isBreaking?: boolean;
      reason?: R;
    };
