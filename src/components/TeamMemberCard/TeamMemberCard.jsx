import { FaTwitter, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const STRAPI_BASE_URL = "http://localhost:1337";

const TeamMemberCard = ({ member }) => {
  const imageUrl = member.image?.url
    ? `${STRAPI_BASE_URL}${member.image.url}`
    : "https://via.placeholder.com/150";
 
  return (
    <div className="col-12 col-sm-10 col-md-6 col-lg-4 d-flex justify-content-center mb-4">
      <Link to={`/members/${member.documentId}`} className="text-decoration-none">
        <div
          className="d-flex flex-column align-items-center mb-5"
          style={{ width: "100%",      // اجعل العرض مرناً
            maxWidth: "320px", }}
        >
          <div
            style={{ position: "relative", marginBottom: "-60px", zIndex: 10 }}
          >
            <img
              src={imageUrl}
              className="rounded-circle border border-5 border-white shadow-lg"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
              }}
              alt={member.name}
            />
          </div>

          <div
            className="rounded-4 p-4 pt-5 text-center text-white shadow-lg w-100"
            style={{
              backgroundColor: member.color || "#333",
              backdropFilter: "blur(10px)",
              border: `1px solid ${member.color}`,
              margin: "0 10px"
            }}
          >
            <h3
              className="fw-bold text-uppercase mt-4 mb-1"
              style={{ fontSize: "1.25rem" }}
            >
              {member.name}
            </h3>

            <p className="small mb-3 opacity-75">{member.position}</p>

            <p
              className="text-muted small  mb-4 px-1"
              style={{ fontSize: "0.8rem", lineHeight: "1.4" }}
            >
              {member.description ||
                "خبير في تقديم أفضل حلول السيارات لعملائنا."}
            </p>
            <div className="d-flex justify-content-center gap-3 mb-2">
              <a
                href={`https://wa.me/${member.Social?.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-white border border-white rounded d-flex align-items-center justify-content-center"
                style={{
                  width: "32px",
                  height: "32px",
                  textDecoration: "none",
                  backgroundColor: "#25D366",
                  borderColor: "#25D366",
                }}
              >
                <FaWhatsapp />
              </a>
              <a
                href={member.Social?.facebook}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-white border border-white rounded d-flex align-items-center justify-content-center"
                style={{
                  width: "32px",
                  height: "32px",
                  textDecoration: "none",
                  borderColor: "#1877F2",
                  backgroundColor: "#1877F2",
                }}
              >
                <FaFacebookF />
              </a>
              <a
                href={member.Social?.twitter}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-white border border-white rounded d-flex align-items-center justify-content-center"
                style={{
                  width: "32px",
                  height: "32px",
                  textDecoration: "none",
                  borderColor: "#1DA1F2",
                  backgroundColor: "#1DA1F2",
                }}
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TeamMemberCard;
