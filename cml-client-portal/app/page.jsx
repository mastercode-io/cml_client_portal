import CreditSearchForm from "../components/CreditSearchForm"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">CML Client Portal</h1>
      <CreditSearchForm />
    </div>
  )
}

