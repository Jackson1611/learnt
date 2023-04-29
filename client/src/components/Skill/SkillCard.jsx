import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function SkillCard({ skill }) {
  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {skill.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {skill.description}
        </Typography>
        <Typography variant="body2">Status: {skill.status}</Typography>
        <Typography variant="body2">
          <a href={skill.url}>{skill.url}</a>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SkillCard;
