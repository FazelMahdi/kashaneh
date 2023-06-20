"use client"
import { Code } from "@nextui-org/code";
import { Snippet } from "@nextui-org/snippet";


export default function Dashboard() {
    return (
        <div>
         		<Snippet hideSymbol hideCopyButton variant="bordered">
					<span>
						Get started by editing <Code color="primary">app/page.tsx</Code>
					</span>
				</Snippet>
        </div>
    );
}
