import UserProfileCard from "@/components/userProfileCard";
import useProtectedRoute from "@/hooks/useProtectedRoute";

const ProfilePage = () => {
  useProtectedRoute();

  return (
    <main className="flex justify-center items-center h-screen ">
      <UserProfileCard />
    </main>
  );
};

export default ProfilePage;
