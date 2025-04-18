import Meeting from "@/components/MeetingPage"; // your client component

export default function MeetingPage({ params }: { params: { id: string } }) {
  return <Meeting id={params.id} />;
}
