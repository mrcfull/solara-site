"use server"

interface FormData {
  fullName: string
  discordUsername: string
  email: string
  age: string
  position: string
  experience: string
  previousExperience?: string
  timezone: string
  availability: string
  motivation: string
  additionalComments?: string
}

export async function submitCrewApplication(prevState: any, formData: FormData) {
  try {
    // Extract form data
    const applicationData = {
      fullName: formData.get("fullName") as string,
      discordUsername: formData.get("discordUsername") as string,
      email: formData.get("email") as string,
      age: formData.get("age") as string,
      position: formData.get("position") as string,
      experience: formData.get("experience") as string,
      previousExperience: (formData.get("previousExperience") as string) || "Not provided",
      timezone: formData.get("timezone") as string,
      availability: formData.get("availability") as string,
      motivation: formData.get("motivation") as string,
      additionalComments: (formData.get("additionalComments") as string) || "None",
    }

    // Validate required fields
    const requiredFields = [
      "fullName",
      "discordUsername",
      "email",
      "age",
      "position",
      "experience",
      "timezone",
      "availability",
      "motivation",
    ]
    for (const field of requiredFields) {
      if (!applicationData[field as keyof typeof applicationData]) {
        return { error: `${field} is required` }
      }
    }

    // Create Discord embed
    const embed = {
      title: "🛩️ New Crew Application - Solara Airlines",
      color: 0xf97316, // Orange color
      timestamp: new Date().toISOString(),
      fields: [
        {
          name: "👤 Personal Information",
          value: `**Name:** ${applicationData.fullName}\n**Discord:** ${applicationData.discordUsername}\n**Email:** ${applicationData.email}\n**Age:** ${applicationData.age}`,
          inline: false,
        },
        {
          name: "✈️ Aviation Details",
          value: `**Position:** ${applicationData.position}\n**Experience:** ${applicationData.experience}`,
          inline: true,
        },
        {
          name: "⏰ Availability",
          value: `**Timezone:** ${applicationData.timezone}\n**Hours/Week:** ${applicationData.availability}`,
          inline: true,
        },
        {
          name: "📝 Previous Experience",
          value: applicationData.previousExperience.substring(0, 1024) || "Not provided",
          inline: false,
        },
        {
          name: "💭 Motivation",
          value: applicationData.motivation.substring(0, 1024),
          inline: false,
        },
      ],
      footer: {
        text: "Solara Airlines Crew Application System",
        icon_url: "https://cdn.discordapp.com/emojis/✈️.png",
      },
    }

    // Add additional comments if provided
    if (applicationData.additionalComments && applicationData.additionalComments !== "None") {
      embed.fields.push({
        name: "💬 Additional Comments",
        value: applicationData.additionalComments.substring(0, 1024),
        inline: false,
      })
    }

    // Send to Discord webhook
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL

    if (!webhookUrl) {
      console.error("Discord webhook URL not configured")
      return { error: "Application system is currently unavailable. Please try again later." }
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
        username: "Solara Airlines",
        avatar_url: "https://example.com/solara-logo.png", // Replace with your actual logo URL
      }),
    })

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Error submitting crew application:", error)
    return { error: "Failed to submit application. Please try again later." }
  }
}
