# ==========================================
# Reverse Proxy Nginx
# ==========================================

FROM nginx:1.27-alpine

LABEL maintainer="Ahsan Mustafa"

# Remove default configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom configuration
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
