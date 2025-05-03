# Use an official Node.js runtime as a parent image
FROM node:20-alpine
#FROM base AS deps

RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

RUN npm ci

# Install dependencies
#RUN npm install --omit=dev

# Copy the entire project
COPY . .

# Build the Next.js app
RUN npm run build

# Install production dependencies only
#RUN npm ci --only=production

#FROM base AS production

ENV NODE_ENV production
ENV NEXT_SHARP_PATH "app/node_modules/sharp"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY public ./public

RUN ls .next

#RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY next.config.ts ./
#COPY .next/standalone ./
#COPY .next/static ./.next/static

RUN chown nextjs:nodejs .next/*

USER nextjs

# Expose the Next.js port
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the application
CMD ["npm", "run", "start"]
#CMD ["node", "server.js"]