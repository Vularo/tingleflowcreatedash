import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://jlnagnhmkmkqndtjisfq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsbmFnbmhta21rcW5kdGppc2ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMzEyMTcsImV4cCI6MjA3MjYwNzIxN30.Db0-LFo5wUXvPhgz3QB7V6S8LHPMqmS_ZsODz_k_IdE"
);


export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("videos")
        .select("id, title, thumbnail_url, video_url")
        .order("id", { ascending: false });

      if (!error) setVideos(data || []);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {videos.map((v) => (
        <Grid item xs={12} sm={6} md={4} key={v.id}>
          <Card sx={{ cursor: "pointer" }} onClick={() => window.location.href = v.video_url}>
            {v.thumbnail_url && (
              <CardMedia
                component="img"
                height="180"
                image={v.thumbnail_url}
                alt={v.title}
              />
            )}
            <CardContent>
              <Typography variant="h6" noWrap>{v.title}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
