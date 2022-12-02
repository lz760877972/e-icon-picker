FROM mrdeerly/vitepress:v1.0.0
# 定义作者
MAINTAINER lz

COPY app/  /app

##设置时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN npm install -g pnpm
RUN cd /app && pnpm install
RUN cd packages/e-icon-picker && npm run build:lib
#CMD ["npm","run","docs:dev" ]

RUN chmod +x /app/script.sh

CMD /app/script.sh
