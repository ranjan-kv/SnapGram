import { Models } from "appwrite";
// Remove unused import
// import { useState } from "react";
// import { useToast } from "@/components/ui/use-toast";
import { Loader, PostCard, UserCard } from "@/components/shared";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";
import { mockPosts, mockCreators } from "@/lib/mock/mockPosts";

const Home = () => {
  // Remove unused variable
  // const { toast } = useToast();
  // const [showMockData, setShowMockData] = useState(true);

  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  // Combine real posts with mock posts
  const combinedPosts = {
    documents: [
      ...(posts?.documents || []),
      ...mockPosts
    ]
  };

  // Combine real creators with mock creators
  const combinedCreators = {
    documents: [
      ...(creators?.documents || []),
      ...mockCreators
    ]
  };

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">
            Feed
          </h2>
          {isPostLoading ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {combinedPosts.documents.map((post) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post as Models.Document} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="home-creators">
        <h3 className="h3-bold text-light-1">
          All Creators
        </h3>
        {isUserLoading ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {combinedCreators.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator as Models.Document} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
