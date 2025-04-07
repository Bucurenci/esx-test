import RegisterForm from "@/components/features/RegisterForm";

export default function RegisterPage() {

    return (
        <div className="row justify-content-center align-items-center">
            <div className="col-12 col-lg-6 col-xxl-5 mt-5">
                <h3 className="text-center mb-4">
                    Register page
                </h3>
                <div className="bg-white rounded shadow p-4">
                    <RegisterForm/>
                </div>
            </div>
        </div>
    );
}