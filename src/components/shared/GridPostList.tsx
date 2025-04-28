import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import PostStats from "@/components/shared/PostStats";
import { useUserContext } from "@/context/AuthContext";
import { storage, appwriteConfig } from "@/lib/appwrite/config";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const processImageUrls = async () => {
      const urlMap: Record<string, string> = {};
      
      for (const post of posts) {
        try {
          if (post.imageUrl && typeof post.imageUrl === 'string' && 
              (post.imageUrl.startsWith('http://') || post.imageUrl.startsWith('https://'))) {
            urlMap[post.$id] = post.imageUrl;
          } else if (post.imageId) {
            urlMap[post.$id] = storage.getFilePreview(
              appwriteConfig.storageId,
              post.imageId
            ).toString();
          } else if (post.imageUrl && typeof post.imageUrl === 'string') {
            urlMap[post.$id] = storage.getFilePreview(
              appwriteConfig.storageId,
              post.imageUrl
            ).toString();
          }
        } catch (error) {
          console.error(`Error processing image for post ${post.$id}:`, error);
          if (post.imageUrl) {
            urlMap[post.$id] = post.imageUrl;
          }
        }
      }
      
      setImageUrls(urlMap);
    };
    
    processImageUrls();
  }, [posts]);

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Hardcode the first post with the Charizard image */}
      <li key="hardcoded-post" className="relative min-w-80 h-80 col-span-full">
        <Link to="/posts/hardcoded" className="grid-post_link">
          <img
            src="https://images5.alphacoders.com/124/1246010.jpg" // Better Charizard image
            alt="hardcoded post"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/assets/icons/profile-placeholder.svg";
            }}
          />
        </Link>
        <div className="grid-post_user">
          {showUser && (
            <div className="flex items-center justify-start gap-2 flex-1">
              <img
                src="/assets/icons/profile-placeholder.svg"
                alt="creator"
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  e.currentTarget.src = "/assets/icons/profile-placeholder.svg";
                }}
              />
              <p className="line-clamp-1">Hardcoded User</p>
            </div>
          )}
          {showStats && (
            <PostStats
              post={{
                $id: "hardcoded",
                $collectionId: "hardcodedCollection",
                $databaseId: "hardcodedDatabase",
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: [],
                imageUrl: "https://images.unsplash.com/photo-1682687982501-1e58ab814714", // Charizard image URL
                creator: {
                  $id: "hardcodedCreator",
                  name: "Hardcoded User",
                  imageUrl: "/assets/icons/profile-placeholder.svg",
                  username: "hardcodedUser"
                },
                caption: "Hardcoded caption",
                imageId: "hardcodedImageId",
                location: "Hardcoded Location",
                tags: ["hardcoded"],
                likes: [],
                userId: "hardcodedUserId"
              }}
              userId={user.id}
            />
          )}
        </div>
      </li>

      {/* Render the rest of the posts */}
      {posts.map((post, index) => (
        <li key={post.$id || `post-${index}`} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={imageUrls[post.$id] || post.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="post"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/assets/icons/profile-placeholder.svg";
              }}
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                    post.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/icons/profile-placeholder.svg";
                  }}
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
