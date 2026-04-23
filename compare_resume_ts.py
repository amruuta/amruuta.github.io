from pypdf import PdfReader
from pathlib import Path

pdf_path = Path(r"D:\PersonalProjects\images\Amruta_Bendale-Software_Engineer.pdf")
ts_path = Path(r"D:\PersonalProjects\PortfolioWebsite\portfolio-web\src\data\portfolioData.ts")

pdf = "\n".join((p.extract_text() or "") for p in PdfReader(str(pdf_path)).pages)
ts = ts_path.read_text(encoding="utf-8")

checks = []
if "https://amruuta.github.io" in pdf and 'github: ""' in ts:
    checks.append(("personal.github", '""', '"https://amruuta.github.io"'))
if "FastAPI" in pdf and '"FastAPI"' not in ts:
    checks.append(("skills.backendFrameworks", "missing", 'add "FastAPI"'))
if "WESTERN UNION | Junior Associate" in pdf and 'position: "Junior Associate — Java Developer"' in ts:
    checks.append(("experience[0].position", '"Junior Associate — Java Developer"', '"Junior Associate"'))
if "CLSA | Software Engineer" in pdf and 'position: "Software Engineer — Full Stack"' in ts:
    checks.append(("experience[1].position", '"Software Engineer — Full Stack"', '"Software Engineer"'))
if "Playmaker Award" in pdf and "Playmaker Award" not in ts:
    checks.append(("awards", "missing", 'add "Playmaker Award — Outstanding performance during the migration (Q4 2025)."'))
if "Data Analytics Chatbot" in pdf and 'name: "Data Analysis Chatbot"' in ts:
    checks.append(("projects[0].name", '"Data Analysis Chatbot"', '"Data Analytics Chatbot"'))

for field, old, new in checks:
    print(f"{field} | {old} -> {new}")
