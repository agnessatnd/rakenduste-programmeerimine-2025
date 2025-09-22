import { Box, Stack, Typography, Divider } from "@mui/material"

export default function About() {
  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
      >
        About
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2}>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at
          nulla et sapien tincidunt fermentum. Phasellus dignissim urna at odio
          tempor, in iaculis sem sagittis.
        </Typography>

        <Typography>
          Donec posuere, sapien in suscipit placerat, nisl ex lobortis eros, non
          posuere lorem justo vel nulla. Integer imperdiet, sem at tincidunt
          ullamcorper, velit mi porttitor lorem, sit amet feugiat felis neque at
          tortor.
        </Typography>

        <Typography>
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Sed vitae sapien quis neque tincidunt
          tristique. Phasellus sed finibus tellus. Morbi viverra bibendum
          turpis, et tincidunt justo.
        </Typography>

        <Typography>
          In hac habitasse platea dictumst. Curabitur vel justo eget mauris
          faucibus euismod. Nunc sed malesuada nisl. Curabitur in sapien nec
          arcu pulvinar suscipit.
        </Typography>
      </Stack>
    </Box>
  )
}
