import { createFileRoute, notFound } from "@tanstack/react-router";
import { AnswerPage } from "@/components/answer-body";
import { getMaster } from "@/data/index";

export const Route = createFileRoute("/q/$questionId")({
  component: QuestionRoute,
});

function QuestionRoute() {
  const { questionId } = Route.useParams();
  const master = getMaster(questionId);
  if (!master) throw notFound();
  return <AnswerPage master={master} />;
}
