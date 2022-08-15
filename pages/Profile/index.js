// pages/profile.js
import { Auth, Typography, Button } from "@supabase/ui";
import Avatar from "../../components/profile/Avatar";
import { useState } from "react";
const { Text } = Typography
import { supabase } from '../../api'

function Profile(props) {
  const { user } = Auth.useUser();
  const [avatar_url, setAvatarUrl] = useState('')
  const [profile, setProfile] = useState(false)
  const [uploading, setUploading] = useState(false)

  async function updateProfile(event) {
    await supabase
    .from("profiles") // Select the Table
    .insert([
      {
        created_at: new Date(),
        email: user.email,
        avatar: avatar_url,
      },
    ]) // Insert the new task
    .single();
    setProfile({
      email: user.email,
        avatar: avatar_url,
    }); // Reset the task details
  }

    if (user)
      return (
        <>
          <Text>Signed in: {user.email}</Text>
          <Avatar
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url)
              updateProfile()
            }}
          />
          <Button block onClick={() => props.supabaseClient.auth.signOut()}>
            Sign out
          </Button>
        </>
      );
    return props.children 
}

export default function AuthProfile() {
    return (
        <Auth.UserContextProvider supabaseClient={supabase}>
          <Profile supabaseClient={supabase}>
            <Auth supabaseClient={supabase} />
          </Profile>
        </Auth.UserContextProvider>
    )
}