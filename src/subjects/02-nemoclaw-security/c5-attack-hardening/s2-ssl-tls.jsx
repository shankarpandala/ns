import SectionLayout from '../../../components/content/SectionLayout'
import CodeBlock from '../../../components/content/CodeBlock'
import NoteBlock from '../../../components/content/NoteBlock'

export default function SslTls() {
  return (
    <SectionLayout
      title="SSL/TLS Configuration"
      subtitle="Encrypt local service communication and manage certificates for trading infrastructure."
      difficulty="advanced"
      readingMinutes={5}
    >
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        Even on localhost, TLS prevents packet sniffing of API keys and order data
        by other processes. This is defense-in-depth against local privilege escalation.
      </p>

      <h3 className="text-lg font-semibold mb-2">Generate a Local CA</h3>
      <CodeBlock
        language="bash"
        title="Create a self-signed CA for NemoClaw services"
        code={`# Create CA directory
mkdir -p ~/.nemoclaw/tls && cd ~/.nemoclaw/tls

# Generate CA private key
openssl genrsa -out ca.key 4096

# Generate CA certificate (valid 3 years)
openssl req -x509 -new -nodes -key ca.key -sha256 \
  -days 1095 -out ca.crt \
  -subj "/CN=NemoClaw Local CA/O=NemoClaw"`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Generate Service Certificates</h3>
      <CodeBlock
        language="bash"
        title="Certificate for Grafana and internal services"
        code={`# Generate service key
openssl genrsa -out service.key 2048

# Create certificate signing request
openssl req -new -key service.key -out service.csr \
  -subj "/CN=localhost/O=NemoClaw"

# Create extension file for SANs
cat > service.ext << EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
subjectAltName=@alt_names
[alt_names]
DNS.1 = localhost
DNS.2 = nemoclaw-grafana
DNS.3 = nemoclaw-api
IP.1 = 127.0.0.1
EOF

# Sign with CA
openssl x509 -req -in service.csr -CA ca.crt -CAkey ca.key \
  -CAcreateserial -out service.crt -days 365 \
  -sha256 -extfile service.ext`}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Apply to Services</h3>
      <CodeBlock
        language="yaml"
        title="docker-compose.yml TLS config"
        code={`services:
  grafana:
    volumes:
      - ~/.nemoclaw/tls/service.crt:/etc/ssl/certs/grafana.crt:ro
      - ~/.nemoclaw/tls/service.key:/etc/ssl/private/grafana.key:ro
    environment:
      GF_SERVER_PROTOCOL: https
      GF_SERVER_CERT_FILE: /etc/ssl/certs/grafana.crt
      GF_SERVER_CERT_KEY: /etc/ssl/private/grafana.key`}
      />

      <NoteBlock type="tip" title="Trust the CA in Your Browser">
        Import <code>ca.crt</code> into your Windows certificate store to avoid browser warnings:
        <code className="block mt-1">certutil -addstore Root ca.crt</code>
      </NoteBlock>

      <NoteBlock type="warning" title="Protect Private Keys">
        Set strict permissions on key files. Never mount them as writable in containers:
        <code className="block mt-1">chmod 600 ~/.nemoclaw/tls/*.key</code>
      </NoteBlock>
    </SectionLayout>
  )
}
