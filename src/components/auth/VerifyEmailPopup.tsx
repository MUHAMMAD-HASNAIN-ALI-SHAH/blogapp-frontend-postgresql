const VerifyEmailPopup = ({ email }: { email: string }) => {
  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
        <h3 className="text-xl font-semibold mb-2">
          Verify your email 📧
        </h3>

        <p className="text-gray-600 mb-4">
          A verification link has been sent to
          <br />
          <span className="font-medium">{email}</span>
        </p>

        <p className="text-sm text-gray-500">
          Please check your inbox and verify your email to continue.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPopup;
